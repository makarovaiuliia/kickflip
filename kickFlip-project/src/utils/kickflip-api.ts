const URL = 'https://auth.europe-west1.gcp.commercetools.com';
const projectKey = 'kick-flip_webstore-warriors';

const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export type TLoginData = {
    email: string;
    password: string;
};

export const loginUserApi = (data: TLoginData) =>
    fetch(
        `${URL}/oauth/${projectKey}/customers/token?grant_type=password&username=${data.email}&password=${data.password}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Basic bUFNUXlzbVU4eTVyMy1qS0Q5Qm9JamJFOjZKZnFmYjVHR0pYZzZtd2QxNjUxZ2QwdEJYVHRITFE0',
            },
        }
    )
        .then((res) => checkResponse<TAuthResponse>(res))
        .then((result) => {
            if (result) return result;
            return Promise.reject(result);
        });

type TAuthResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
};
