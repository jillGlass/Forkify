export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike (id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);

        //persist data in local storage
        this.persistData();
        return like;
    }
    deleteLike (id) {
        //find like and remove it from the array
        const index = this.likes.findIndex(el => el.id === id)
        this.likes.splice(index, 1)

        //persist data in local storage
        this.persistData();
    }

    isLiked (id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // -1 means it's not there in the array
    }

    getNumLikes () {
        return this.likes.length;
    }

    persistData () {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }
}