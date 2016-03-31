module.exports = function(app, express,LoginUserModel,LocotoUserCtrl){

    var locotoApi = express.Router();

	locotoApi.route('/users')
	  .get(LocotoUserCtrl.findAllUsers)
	  .post(LocotoUserCtrl.addUser);

	locotoApi.route('/users/:name')
	  .get(LocotoUserCtrl.findUserByName)
	  .put(LocotoUserCtrl.updateUser)
	  .delete(LocotoUserCtrl.deleteUser);
}