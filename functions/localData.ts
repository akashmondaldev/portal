const GetToken = () => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('skyinc-auth');
        return data ? JSON.parse(data) : null;
    }
}

const SetToken = (token: string) => {
    localStorage.setItem('skyinc-auth', JSON.stringify(token));
}

const RemoveToken = () => {
    localStorage.removeItem('skyinc-auth');
}

export { GetToken, SetToken, RemoveToken }