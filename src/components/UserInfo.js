export class UserInfo{
    constructor({personSelector, jobSelector}) {
    this._personSelector = personSelector;
    this._jobSelector = jobSelector;
    }
    /* Публичный метод метод возврата объекта с данными пользователя */
    getUserInfo(){
        return {
            name: this._personSelector.textContent,
            about: this._jobSelector.textContent,
        }
    }

    /* Публичный метод метод возврата данных пользователя на страницу */
    setUserInfo({name, about}){
        this._personSelector.textContent = name;
        this._jobSelector.textContent = about;
    }
}