import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// import cookie from 'cookie';

export async function checklogin(username: string,password: string){
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('username',username)
  formData.append('password',password)
  try{
    const response= await axios.post('https://crm.simpleplans.com.au/api/?dGljaXBhbnQvVjEvdXNlckxvZ2lucGFyJnM9Mw=%3D',formData,{
      headers:{
        ...formData.getHeaders()
      }
    })
    const responsedata= await response.data.details.CON_Id
    const setCookieHeader = response.headers['set-cookie'];
    console.log(responsedata,setCookieHeader)
      return {setCookieHeader,responsedata}
  }

  catch(error) {
    console.error('Error fetching data:', error);
    return null
  }

}
export async function fetchBudgetTableData() {
  noStore();
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('SRVID', '152');
  // formData.append('NDIS_Id','124');
  try{
      const response= await axios.post('https://crm.simpleplans.com.au/api/?cGFudC9WMS9idWRnZXRUYWJsZXBhcnRpY2kmcz03=null', formData, {
          headers: {
            ...formData.getHeaders(),
            'Cookie': 'PHPSESSID=g3f7s1mq60hbk2iflmecspvvgg',
          }
        });
        // console.log(response)
        return response.data      
    
  } catch (error) {
      console.error('Error fetching data:', error);
  
      return null 
}}


export async function fetchBudgetDetailsData(id:string, sessid:RequestCookie|undefined) {
  noStore();
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('SRVID', id);
  const cookieval="PHPSESSID="+String(sessid)
  try{
      const response= await axios.post('https://crm.simpleplans.com.au/api/?cGFudC9WMS9idWRnZXRUYWJsZXBhcnRpY2kmcz03=null', formData, {
          headers: {
            ...formData.getHeaders(),
            'Cookie': cookieval,
          }
        });

        type Dictionary<T> = { [key: string]: T };
        const output= await response.data
        const totalOpening = Number(output.details.footerData.TotOpening.replace(/,/g, ''))
        let totalClosing: number | string = NaN;
        totalClosing = Number(output.details.footerData.TotCr.replace(/,/g, ''))
        totalClosing = isNaN(totalClosing) ? '-' : totalClosing.toString();
        const totalBalance = output.details.footerData.TotBal.replace(/,/g, '');
        const sum = output.details.tableData.map((curr: Dictionary<string>) =>{return curr.INV_Data.length} )
        const totalInvoices = sum.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

        return {output,totalOpening,totalClosing,totalBalance,totalInvoices};     
    
  } catch (error) {
      console.error('Error fetching data:', error);
      const totalOpening = '-'
      const totalClosing = '-'
      const totalBalance = '-'
      const totalInvoices = '-'
      return {totalOpening,totalClosing,totalBalance,totalInvoices};    
}
}




// export async function fetchCardData() {
//   noStore();
//   const FormData = require('form-data');
//   const formData = new FormData();
//   formData.append('SRVID', '168');
//   // formData.append('NDIS_Id','124');
//   try{
//       const response= await axios.post('https://crm.simpleplans.com.au/api/?cGFudC9WMS9idWRnZXRUYWJsZXBhcnRpY2kmcz03=null', formData, {
//           headers: {
//             ...formData.getHeaders(),
//             'Cookie': 'PHPSESSID=2b8jgeroamg50ehfvveedjki3h',
//           }
//         });
//         type Dictionary<T> = { [key: string]: T };
//         const output= await response.data
//         const totalOpening = Number(output.details.footerData.TotOpening.replace(/,/g, ''))
//         const totalClosing = Number(output.details.footerData.TotCr.replace(/,/g, ''))
//         const totalBalance = output.details.footerData.TotBal.replace(/,/g, '');
//         const sum = output.details.tableData.map((curr: Dictionary<string>) =>{return curr.INV_Data.length} )
//         const totalInvoices = sum.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

//         return {totalOpening,totalClosing,totalBalance,totalInvoices};     
    
//   } catch (error) {
//       console.error('Error fetching data:', error);
//       const totalOpening = '-'
//       const totalClosing = '-'
//       const totalBalance = '-'
//       const totalInvoices = '-'
//       return {totalOpening,totalClosing,totalBalance,totalInvoices};    
// }}

interface Client {
  id: string;
  name: string;
  selected: string;
  srvid: string;
  }

export async function fetchBudgetData(query: string, page: number, sessid:RequestCookie|undefined, con_id:RequestCookie|undefined) {
    page=Number(page)
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('CON_Id', con_id.value);
    const cookieval="PHPSESSID="+String(sessid)
    try{
        const response= await axios.post('https://crm.simpleplans.com.au/api/?bnQvVjEvYnVkZ2V0R3JhcGhwYXJ0aWNpcGEmcz05=null', formData, {
            headers: {
              ...formData.getHeaders(),
              'Cookie': cookieval,
            }
          });
          const regex = new RegExp(query, 'i');
          const temp1 = response.data.details.participants.filter(client => regex.test(client.name))
          // console.log(temp1)
          const temp= temp1.slice((page-1)*12,page*12)     
          const newKey = 'srvid';
          const final = temp.map(client => ({
            ...client,
            [newKey]: response.data.details.graphDetails[client.id][0].SRVID
        }));        
          
        return final
    } catch (error) {
        console.error('Error fetching data:', error);
    
        return null 
}}

export async function fetchTotalClientPages(query:string, sessid: RequestCookie|undefined, con_id: RequestCookie|undefined) {
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('CON_Id', con_id?.value);
  const cookieval="PHPSESSID="+String(sessid)
  try{
      const response= await axios.post('https://crm.simpleplans.com.au/api/?bnQvVjEvYnVkZ2V0R3JhcGhwYXJ0aWNpcGEmcz05=null', formData, {
          headers: {
            ...formData.getHeaders(),
            'Cookie': cookieval,
          }
        });
        const regex = new RegExp(query, 'i');
        const temp1 = response.data.details.participants.filter(client => regex.test(client.name))
        return Math.ceil(temp1.length/12)      
    
  } catch (error) {
      console.error('Error fetching data:', error);
  
      return null 
}}