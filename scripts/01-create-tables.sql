-- إنشاء جداول قاعدة البيانات لتطبيق حفظ القرآن الكريم

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الحصون (الأنشطة الرئيسية)
CREATE TABLE IF NOT EXISTS fortresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#10B981', -- لون افتراضي أخضر
  icon VARCHAR(50) DEFAULT 'book',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الأنشطة
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  fortress_id UUID REFERENCES fortresses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  surah_name VARCHAR(100),
  ayah_from INTEGER,
  ayah_to INTEGER,
  activity_type VARCHAR(50) NOT NULL, -- 'memorization', 'review', 'recitation'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
  difficulty_level INTEGER DEFAULT 1, -- 1-5
  estimated_duration INTEGER, -- بالدقائق
  actual_duration INTEGER, -- بالدقائق
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الإحصائيات اليومية
CREATE TABLE IF NOT EXISTS daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_activities INTEGER DEFAULT 0,
  completed_activities INTEGER DEFAULT 0,
  total_duration INTEGER DEFAULT 0, -- بالدقائق
  memorization_count INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  recitation_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- جدول الإعدادات الشخصية
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  theme VARCHAR(20) DEFAULT 'light', -- 'light', 'dark', 'auto'
  language VARCHAR(10) DEFAULT 'ar', -- 'ar', 'en'
  font_size VARCHAR(20) DEFAULT 'medium', -- 'small', 'medium', 'large'
  notifications_enabled BOOLEAN DEFAULT true,
  daily_goal INTEGER DEFAULT 3, -- عدد الأنشطة المستهدفة يومياً
  preferred_reciter VARCHAR(100),
  mushaf_type VARCHAR(50) DEFAULT 'uthmani', -- نوع المصحف المفضل
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الإشعارات
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'reminder', 'achievement', 'system'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_fortress_id ON activities(fortress_id);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at);
CREATE INDEX IF NOT EXISTS idx_daily_stats_user_date ON daily_stats(user_id, date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
