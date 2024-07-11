import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export default function validatecookie(sessid:RequestCookie|undefined) {
  try{
    if(!sessid){
    redirect('/login');
  }}
  catch{
    redirect('/login');
  }
}
