import {formatISO, parse} from 'date-fns'
export const convertToISO = (strDate: Date) => {
   console.log(formatISO(strDate));
}