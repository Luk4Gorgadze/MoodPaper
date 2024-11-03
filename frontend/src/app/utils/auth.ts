export const checkAuthStatus = async (
    setIsAuthenticated: (value: boolean) => void,
    setUser: (value: any) => void
) => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
    }, {} as { [key: string]: string })

    const isAuth = !!cookies['sessionid'] && !!cookies['csrftoken']
    setIsAuthenticated(isAuth)

    if (isAuth) {
        try {
            const response = await fetch(`https://www.moodpaper.art/djangoapi/auth/user-info`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('User info:', data);
                setUser(data);
                console.log('User name:', data.username);
                return data;
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            setUser(null);
        }
    } else {
        setUser(null);
    }
    return null;
}