import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

    get(path, isAuth = false) {
      return new Promise((resolve, reject) => {
        let url = environment.baseUrl;
        if (isAuth) {
          url += environment.baseAuth
        }
        url += path
        this.http.get(url).subscribe((res: any) => {
          if (res) {
            resolve(res.data)
          }
          else {
            reject(res)
          }
        }, (err) => {
          reject(err)
        })
      })
    }

    getById(path, id?, isAuth = false) {
      return new Promise((resolve, reject) => {
         
        let url = environment.baseUrl
        if (isAuth) {
          url += environment.baseAuth
        }
        if(id>0){
          url += path + "/" + id

        }else{
          url += path
        }
        this.http.get(url).subscribe((res: any) => {
          if (res) {
            resolve(res.data)
          }
          else {
            reject(res)
          }
        }, (err) => {
          reject(err)
        })
      })
    }

    post(path, body) {
      return new Promise((resolve, reject) => {
        let options_: any = {
          body: body,
          observe: "response",
          responseType: "json",
          headers: new HttpHeaders({
          })
        };
        this.http.request("post", environment.baseUrl + path, options_).subscribe((res: any) => {
          if (res.body.data) {
            resolve(res.body.data)
          }else if(res.body){
            resolve(res.body)
          }
          else {
            reject(res)
          }
        }, (err) => {
          reject(err)
        });
      })
    }

 


    update(path, body, id) {
      let options_: any = {
        body: body,
        observe: "response",
        responseType: "json",
        headers: new HttpHeaders({
        })
      };
      return new Promise((resolve, reject) => {
        this.http.request("post",`${environment.baseUrl}${path}/${id}${"?_method=PUT"}`, options_).subscribe((res: any) => {
          if (res.body.data) {
            resolve(res.body.data)
          }
          else {
            reject(res)
          }
        }, (err) => {
          reject(err)
        })
      })
    }

    delete(path, id) {
      return new Promise((resolve, reject) => {
        this.http.delete(environment.baseUrl + path  + id).subscribe((res: any) => {
          if (res.success == true) {
            resolve(res)
          }
          else {
            reject(res)
          }
        }, (err) => {
          reject(err)
        })
      })
    }

    getProtectedResource(apiUrl) {
      const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW46QWRtMW4=');
       let data=  this.http.get(apiUrl, { headers });
       debugger
       return data;
    }
    getImages(path) {
      return new Promise((resolve, reject) => {
        let url = environment.resourcePath;
        url += path
        debugger
        this.http.get(url).subscribe((res: any) => {
          debugger
          if (res) {
            resolve(res.data)
          }
          else {
            reject(res)
          }
        }, (err) => {
          reject(err)
        })
      })
    }


    deleteImage(prod_id,image_id) {
      return new Promise((resolve, reject) => {
        this.http.delete(environment.baseUrl  + 'admin/products/' + prod_id + '/delete-image/'+image_id).subscribe((res: any) => {
          if (res.success == true) {
            resolve(res)
          }
          else {
            reject(res)
          }
        }, (err) => {
          reject(err)
        })
      })
    }

   
 
}
