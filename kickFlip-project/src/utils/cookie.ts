export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        // eslint-disable-next-line no-useless-escape
        new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

interface CookieProps {
    [key: string]: string | number | Date | boolean;
}

export function setCookie(name: string, value: string, props: CookieProps = {}) {
    const newProps: CookieProps = {
        path: '/',
        ...props,
    };

    let exp = newProps.expires;
    if (exp && typeof exp === 'number') {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = d;
        newProps.expires = d.toUTCString();
    } else if (exp && exp instanceof Date) {
        newProps.expires = exp.toUTCString();
    }

    const encodedValue = encodeURIComponent(value);
    let updatedCookie = `${name}=${encodedValue}`;
    Object.entries(newProps).forEach(([propName, propValue]) => {
        updatedCookie += `; ${propName}`;
        if (propValue !== true) {
            updatedCookie += `=${propValue}`;
        }
    });

    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}
