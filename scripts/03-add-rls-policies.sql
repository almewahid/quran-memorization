-- إضافة سياسات الأمان على مستوى الصفوف (RLS)

-- تفعيل RLS على جميع الجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- سياسات جدول المستخدمين
CREATE POLICY "users_select_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- سياسات جدول الأنشطة
CREATE POLICY "activities_select_own" ON activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "activities_insert_own" ON activities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "activities_update_own" ON activities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "activities_delete_own" ON activities FOR DELETE USING (auth.uid() = user_id);

-- سياسات جدول الإحصائيات اليومية
CREATE POLICY "daily_stats_select_own" ON daily_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "daily_stats_insert_own" ON daily_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "daily_stats_update_own" ON daily_stats FOR UPDATE USING (auth.uid() = user_id);

-- سياسات جدول إعدادات المستخدم
CREATE POLICY "user_settings_select_own" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_settings_insert_own" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_settings_update_own" ON user_settings FOR UPDATE USING (auth.uid() = user_id);

-- سياسات جدول الإشعارات
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_insert_own" ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "notifications_delete_own" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- إنشاء دالة لإنشاء ملف تعريف المستخدم تلقائياً
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- إنشاء سجل في جدول المستخدمين
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', 'مستخدم جديد'),
    COALESCE(new.raw_user_meta_data ->> 'avatar_url', null)
  )
  ON CONFLICT (id) DO NOTHING;

  -- إنشاء إعدادات افتراضية للمستخدم
  INSERT INTO public.user_settings (
    user_id, 
    language, 
    theme, 
    daily_goal, 
    notifications_enabled,
    mushaf_type,
    preferred_reciter,
    font_size
  )
  VALUES (
    new.id,
    'ar',
    'light',
    5,
    true,
    'hafs',
    'mishary',
    'medium'
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN new;
END;
$$;

-- إنشاء المشغل
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
