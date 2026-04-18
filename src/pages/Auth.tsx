import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Mode = 'login' | 'register';

interface AuthProps {
  onAuth: () => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    setError('');
    if (!phone || !password || (mode === 'register' && !name)) {
      setError('Заполните все поля');
      return;
    }
    if (password.length < 4) {
      setError('Пароль слишком короткий');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth();
    }, 900);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-[42%] bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${120 + i * 80}px`,
                height: `${120 + i * 80}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">DP</span>
            </div>
            <span className="text-white font-semibold text-lg">DimanPro</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h1 className="text-white text-3xl font-semibold leading-snug">
              Общайтесь безопасно.<br />Без компромиссов.
            </h1>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Каждое сообщение защищено сквозным шифрованием. Только вы и ваш собеседник.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { icon: 'Lock', text: 'Сквозное шифрование всех сообщений' },
              { icon: 'Zap', text: 'Мгновенная доставка' },
              { icon: 'Shield', text: 'Полная приватность данных' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon name={icon} size={14} className="text-white" />
                </div>
                <span className="text-white/80 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-xs">© 2026 DimanPro. Все права защищены.</p>
        </div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold">DP</span>
            </div>
            <span className="text-foreground font-semibold text-lg">DimanPro</span>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'login' ? 'Войти в аккаунт' : 'Создать аккаунт'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'login' ? 'С возвращением!' : 'Регистрация займёт меньше минуты'}
            </p>
          </div>

          <div className="flex mt-6 mb-6 bg-secondary rounded-xl p-1">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === m ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {m === 'login' ? 'Вход' : 'Регистрация'}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {mode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">Имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Петров"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">Номер телефона</label>
              <div className="relative">
                <Icon name="Phone" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 900 000-00-00"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-xs bg-destructive/5 px-3 py-2 rounded-lg">
                <Icon name="AlertCircle" size={13} />
                {error}
              </div>
            )}

            {mode === 'login' && (
              <button className="text-xs text-primary hover:text-primary/70 transition-colors text-right">
                Забыли пароль?
              </button>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={15} className="animate-spin" />
                  {mode === 'login' ? 'Входим...' : 'Создаём аккаунт...'}
                </>
              ) : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">или</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            <Icon name="Lock" size={12} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Все данные защищены сквозным шифрованием
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
