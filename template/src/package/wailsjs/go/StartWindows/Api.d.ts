// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {StartWindows} from '../models';

export function DeviceRequest(arg1:string,arg2:string,arg3:string,arg4:any):Promise<{[key: string]: any}>;

export function DeviceUpload(arg1:string,arg2:string,arg3:string,arg4:string):Promise<{[key: string]: any}>;

export function DownloadFile(arg1:string,arg2:string):Promise<boolean>;

export function GetPlatform():Promise<string>;

export function OpenFile(arg1:string,arg2:string,arg3:string):Promise<string>;

export function SaveFile(arg1:string,arg2:string):Promise<string>;

export function ServiceRequest(arg1:string,arg2:string,arg3:any,arg4:string):Promise<StartWindows.ReturnResponse>;
