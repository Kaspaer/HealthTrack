import { create } from 'zustand';
type User = { id:string; name:string; email:string };
export const useAuth = create<{user:User|null;token:string|null;login:(e:string,p:string)=>void;logout:()=>void}>(()=>({
  user:null,token:null,
  login:(email,password)=>{localStorage.setItem('ht_token','1');localStorage.setItem('ht_user',JSON.stringify({id:'1',name:'Demo',email}));},
  logout:()=>{localStorage.clear();}
}));