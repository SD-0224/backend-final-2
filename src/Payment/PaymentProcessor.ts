export interface PaymentProcessor{
    payWithUPI(amount:number,upiId:string):Promise<boolean>
    payWithAmazonPay(amount:number,amazonPatToken:string):Promise<boolean>
    payWithCreditOrDebitCArd(amount:number,cardToken:string):Promise<boolean>
    payWithApplePay(amount:number,applePayToken:string):Promise<boolean>
    payWithGooglePay(amount:number,googlePayToken:string):Promise<boolean>
    payWithPhonePe(amount:number,phonePeToken:string):Promise<boolean>
    payWithPayTm(amount:number,payTmToken:string):Promise<boolean>
    payWithVisaCard(amount:number,visaToken:string):Promise<boolean>
}
