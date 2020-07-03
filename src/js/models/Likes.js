export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike (id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    }
    deleteLike (id) {
        //find like and remove it from the array
        const index = this.likes.findIndex(el => el.id === id)
        this.likes.splice(index, 1)
    }

    isLiked (id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // -1 means it's not there in the array
    }

    getNumLikes () {
        return this.likes.length;
    }
}