-- إدراج البيانات الأولية للحصون والأنشطة

-- إدراج الحصون الافتراضية
INSERT INTO fortresses (id, name, description, color, icon) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'حفظ جديد', 'حفظ آيات وسور جديدة من القرآن الكريم', '#10B981', 'book-open'),
  ('550e8400-e29b-41d4-a716-446655440002', 'مراجعة', 'مراجعة ما تم حفظه سابقاً', '#3B82F6', 'refresh-cw'),
  ('550e8400-e29b-41d4-a716-446655440003', 'تلاوة', 'تلاوة وتحسين الأداء', '#8B5CF6', 'mic'),
  ('550e8400-e29b-41d4-a716-446655440004', 'تدبر', 'تدبر معاني الآيات والتفسير', '#F59E0B', 'heart'),
  ('550e8400-e29b-41d4-a716-446655440005', 'تجويد', 'تعلم وتطبيق أحكام التجويد', '#EF4444', 'volume-2')
ON CONFLICT (id) DO NOTHING;

-- إنشاء مستخدم تجريبي (سيتم استبداله بنظام المصادقة الحقيقي)
INSERT INTO users (id, email, full_name) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'demo@example.com', 'مستخدم تجريبي')
ON CONFLICT (email) DO NOTHING;

-- إدراج إعدادات افتراضية للمستخدم التجريبي
INSERT INTO user_settings (user_id, theme, language, daily_goal) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'light', 'ar', 3)
ON CONFLICT (user_id) DO NOTHING;
