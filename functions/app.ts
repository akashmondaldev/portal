
export function truncate(input:string) {
    if (input.length > 5) {
       return input.substring(0, 25) + '...';
    }
    return input;
 };