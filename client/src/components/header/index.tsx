import { ThemeSelector } from '@/components/theme-selector';
import { AuthActions } from '@/components/header/auth-actions';
import { Logo } from '@/components/logo';


export function Header() {
    return (
        <header className={ 'items-center max-w-screen-xl flex justify-between mb-20' }>
            <Logo />
            
            <div className={ 'flex gap-2 items-center' }>
                <ThemeSelector />
                <AuthActions />
            </div>
        </header>
    );
}
