import Axios from "axios";
class API {
  adapter;
  constructor() {
  this.adapter = Axios.create();
  }
loginUser(data) {
     return this.adapter
       .post("http://localhost:1337/api/auth/local", data)
   }
register(data) {
     return this.adapter.post(
       "http://localhost:1337/api/auth/local/register",
       data
     );
   }
getInfoForMe(data){
     return this.adapter.get("http://localhost:1337/api/users/me",data)
   }
 }
export default new API();