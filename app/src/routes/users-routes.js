// import com {} importa apenas o Router de dentro do express
import { Router } from 'express';
import { getUsers, pageAddUser, addUser, deleteUser, getUser, pageUpdateUser, updateUser } from '../controllers/users-controller.js';

const router = Router();

router.get('/', getUsers);

router.post('/', getUsers);

router.get('/addUser', pageAddUser);

router.post('/addUser', addUser);

router.get('/user/:id', getUser);

router.get('/updateUser/:id', pageUpdateUser);

router.post('/updateUser/:id', updateUser);

router.delete('/deleteUser/:id', deleteUser);

export default router;