class ErrorApp extends Error {
  constructor(public message:string, public codeStatus:number = 400) {
    super(message)
  }
}

export {ErrorApp}