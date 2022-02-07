/* 
Los filtros son funciones que devuelven 
la info formateada, pero no modifican
la info original
*/

import numeral from "numeral";

const dollarFilter = function(value){
    if(!value){
        return '$ 0'
    }

    return numeral(value).format('($0.00a)')
}

export { dollarFilter }