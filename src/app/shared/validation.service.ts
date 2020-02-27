import { Injectable } from "@angular/core";
import { FormControl, AbstractControl, FormGroup } from "@angular/forms";

@Injectable()
export class ValidationService {
   public static gZeroValidate(c: AbstractControl) {
    return parseInt(c.value) >= 0
      ? null
      : {
          validateGZero: {
            valid: false
          }
        };
  }

  public static gtZeroValidate(c: AbstractControl) {
    return parseInt(c.value) > 0
      ? null
      : {
          validateGTZero: {
            valid: false
          }
        };
  }

  public static decimalValidate(c: AbstractControl) {
    let NUMERIC_REGEXP = /^\d{0,8}(\.\d{1,2})?$/i;

    return NUMERIC_REGEXP.test(c.value)
      ? null
      : {
          validateDecimal: {
            valid: false
          }
        };
  }

  // public static emptyValidate(c: AbstractControl) {
  //   if (typeof c.value == "string") {
  //     return c.value.trim() != ""
  //       ? null
  //       : {
  //           validateEmpty: {
  //             valid: false
  //           }
  //         };
  //   } else {
  //     return null;
  //   }
  // }
  public static numericValidate(c: AbstractControl) {
    if (c.value && c.value.length) {
      let NUMERIC_REGEXP = /^[0-9]+$/i;
      return NUMERIC_REGEXP.test(c.value)
        ? null
        : {
            validateNumeric: {
              valid: false
            }
          };
    } else {
      return null;
    }
  }
  public static alphaValidate(c: AbstractControl) {
    let ALPHA_REGEXP = /^[a-z. ]*$/i;
    return ALPHA_REGEXP.test(c.value)
      ? null
      : {
          validateAlpha: {
            valid: false
          }
        };
  }
  public static checkboxValidate(c: AbstractControl) {
    if (typeof c.value == "boolean") {
      return c.value == true
        ? null
        : {
            validateCheck: {
              valid: false
            }
          };
    } else {
      return null;
    }
  }

  public static alphaNumericValidate(c: AbstractControl) {
    // let ALPHA_NUMERIC_REGEXP = /^[a-z0-9/ /-]*$/i;
    let ALPHA_NUMERIC_REGEXP = /^[a-z0-9/ -/_/`/'/&/@/!/%]*$/i;
    return ALPHA_NUMERIC_REGEXP.test(c.value)
      ? null
      : {
          validateAlphaNumeric: {
            valid: false
          }
        };
  }
  public static discountCodeValidate(c: AbstractControl) {
    // let ALPHA_NUMERIC_REGEXP = /^[a-z0-9/ /-]*$/i;
    let ALPHA_NUMERIC_REGEXP = /^[a-z0-9-_@]*$/i;
    return ALPHA_NUMERIC_REGEXP.test(c.value)
      ? null
      : {
          validateCode: {
            valid: false
          }
        };
  }

  public static questionValidate(c: AbstractControl) {
    // let ALPHA_NUMERIC_REGEXP = /^[a-z0-9/ /-]*$/i;
    let ALPHA_NUMERIC_REGEXP = /^[a-z0-9/ -/_/`/'/&/@/?/!/%]*$/i;
    return ALPHA_NUMERIC_REGEXP.test(c.value)
      ? null
      : {
          validateQuestion: {
            valid: false
          }
        };
  }

  public static firstAlphanumValidate(c: AbstractControl) {
    if (c.value && c.value.length) {
      let ALPHA_REGEXP = /^[a-z0-9]*$/i;
      return ALPHA_REGEXP.test(c.value[0])
        ? null
        : {
            validateAlphanumFirst: {
              valid: false
            }
          };
    } else {
      return null;
    }
  }
  public static emailValidate(c: AbstractControl) {
    // let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(c.value)
      ? null
      : {
          validateEmail: {
            valid: false
          }
        };
  }

  public static phoneValidator(c: AbstractControl) {
    let PHONE_REGEXP = /^(\+)?[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/i;

    if ((c.value[0] == "+" || c.value[0] == "0") && c.value.length == 10) {
      return {
        validatePhone: {
          valid: false
        }
      };
    } else {
      return PHONE_REGEXP.test(c.value)
        ? null
        : {
            validatePhone: {
              valid: false
            }
          };
    }
  }

  public static passwordValidate(firstField, secondField) {
    return (c: FormGroup) => {
      return c.controls &&
        c.controls[firstField].value == c.controls[secondField].value
        ? null
        : {
            passwordsEqual: {
              valid: false
            }
          };
    };
  }

  public static urlValidator(c: AbstractControl) {
    let URL_REGEXP = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/)?[.a-z0-9/-]+$/;
    return URL_REGEXP.test(c.value)
      ? null
      : {
          validateUrl: {
            valid: false
          }
        };
  }

  /**---------------------------------------------------------- */

  /**
   * Validates email address
   *
   * @param formControl
   */
  public static validateEmail(formControl: FormControl): { [error: string]: any } {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(formControl.value)
      ? null
      : { validateEmail: { valid: false } };
  }

  /**
   * Validates required numeric values
   *
   * @param formControl
   */
  public static numericRequired(formControl: FormControl): { [error: string]: any } {
    return formControl.value && formControl.value > 0
      ? null
      : { numericRequired: { valid: false } };
  }

  /**
   * Validates matching string values
   *
   * @param controlKey
   * @param matchingControlKey
   */
  public static matchingPasswords(
    controlKey: string,
    matchingControlKey: string
  ): { [error: string]: any } {
    return (group: FormGroup): { [key: string]: any } => {
      if (
        group.controls[controlKey].value !==
        group.controls[matchingControlKey].value
      ) {
        return { mismatch: { valid: false } };
      }
    };
  }

  public static minValueValidator = (min: number) => {
    return (c: AbstractControl) => {
      if (typeof c.value == "string") {
        var str = c.value.trim();
        console.log(str, "  str.length < min", str.length < 3)
        if (str.length < min) {
          return {
            minValue: { valid: false }
          };
        }
        return null;
      } else {
        return null;
      }
    };
  };
  public static maxValueValidator = (max: number) => {
    return (c: AbstractControl) => {
      if (typeof c.value == "string") {
        var str = c.value.trim();
        if (str.length > max) {
          return {
            maxValue: { valid: false }
          };
        }
        return null;
      } else {
        return null;
      }
    };
  };
//--------------------------------------------  MUKUL Validation  ---------------------------------------------
public static emptyValidate(control: FormGroup) {
  let firstCharacter=control.value.charAt(0)
 
  if(firstCharacter==' '){
        return{ space: {valid:true}  
      }}
 else {
      return null;
  }
}

public static characterValidate(control: FormGroup) {
let firstCharacter=control.value.charAt(0)
 let firstCharacterRegex=/^[A-Za-z][A-Za-z]*$/
 if(firstCharacter==''){
  return null
 }
    else if(!firstCharacterRegex.test(firstCharacter))  {
  return  {validateFirstCharacter: {
      valid: true      }   
 }}
 else{
   return null
 }
}
//-----------------------------------------------------------------------------------------------------------------------
}

