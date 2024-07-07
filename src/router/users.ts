import express from 'express';

//isAuthenticated檢查登入
//isOwner檢查是否為擁有者
import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated , isOwner } from '../middlewares';


export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated , isOwner , deleteUser);
    router.patch('/users/:id', isAuthenticated , isOwner , updateUser);
}