//
import Entity from '../Entity';

/**
 * @class MsgEntity
 */
export default class MsgEntity extends Entity
{
    /**
     * 
     * @param {object} data 
     */
    constructor(data = {})
    {
        super(data);
    }

    _date()
    {
        let date = null;
        if (this.date instanceof Date) {
            date = this.date;
        } else if ('string' == typeof this.date) {
            date = new Date(this.date);
            if ('Invalid Date' === date.toString()) {
                date = null;
            }
        }
        return date;
    }

    dateAsStr()
    {
        let str = '..../../..';
        let date = this._date();
        if (date instanceof Date) {
            str = date.toDateString();
        }
        return str;
    }

    dateIsToday()
    {
        let date = this._date();
        if (date instanceof Date) {
            return (date.toDateString() == (new Date()).toDateString());
        }
        return false;
    }

    dateIsYesterday()
    {
        let date = this._date();
        if (date instanceof Date) {
            let yesterday = (new Date(new Date().getTime() - (86400 * 1000)));
            return (date.toDateString() == yesterday.toDateString());
        }
        return false;
    }
}