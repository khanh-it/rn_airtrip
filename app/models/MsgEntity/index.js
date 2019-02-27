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

    /**
     * 
     * @returns {String}
     */
    key()
    {
        let key = this.id;
        return key;
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

    /**
     * Get tel (formatted) info
     * @return {String}
     */
    getTel()
    {
        let tel = new String(this.tel).toString().trim();
        return tel;
    }

    /**
     * Check tel match?
     * @param {String} tel
     * @return {Boolean}
     */
    isTelMatched(tel)
    {
        return tel == this.getTel();
    }

    /**
     * Get content (formatted) info
     * @return {String}
     */
    getContent()
    {
        let content = new String(this.content).toString().trim();
        return content;
    }   
}