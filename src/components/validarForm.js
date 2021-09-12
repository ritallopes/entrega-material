export function minTamValidacao (minLength, valueInput){
    if(valueInput? String(valueInput).trim().length < minLength : true){
        return `Minimo de caracteres é ${minLength}`;
    }
    return null;
}
export function campoRequeridoValidacao (valueInput){
    if(valueInput? String(valueInput).trim() === '': true){
        return `Campo obrigatório`;
    }
    return null;
}