export class UserInfo{
    constructor({personSelector, jobSelector}) {
    this._personSelector = personSelector;
    this._jobSelector = jobSelector;
    }
    /* Публичный метод метод возврата объекта с данными пользователя */
    getUserInfo(){
        return {
            title: this._personSelector.textContent,
            subtitle: this._jobSelector.textContent,
        }
    }

    /* Публичный метод метод возврата данных пользователя на страницу */
    setUserInfo({person, profession}){
        this._personSelector.textContent = person;
        this._jobSelector.textContent = profession;
    }
}