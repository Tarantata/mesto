export class UserInfo{
    constructor({personElement, jobElement, avatar, handleId}) {
    this._personElement = personElement;
    this._jobElement = jobElement;
    this._handleId = handleId;
    this._avatar = avatar
    }
    /* Публичный метод метод возврата объекта с данными пользователя */
    getUserInfo(){
        return {
            name: this._personElement.textContent,
            about: this._jobElement.textContent,
        }
    }

    /* Публичный метод метод возврата данных пользователя на страницу */
    setUserInfo({name, about, avatar, _id}){
        this._personElement.textContent = name;
        this._jobElement.textContent = about;
        this._avatar.src = avatar;
        this._setUserId(_id)
    }

    _setUserId(id) {
        this._handleId(id)
    }
}