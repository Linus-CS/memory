export function load({ cookies }) {
    const master_key = cookies.get('master_key');

    return {
        master_key
    };
}