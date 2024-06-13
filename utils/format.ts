import { format, formatDistanceToNow } from "date-fns";
import Decimal from "decimal.js";
import { replace } from "lodash";
import numeral from "numeral";

// Number ----------------------------------------------------------------------

export function fCurrency(number: any, fix: any) {
  try {
    let str = number + "";
    if (str.indexOf("e") >= 0) {
      str = number.toFixed(8) + "";
    }
    const deleteText = str.replace(/[^\d.]/g, ""); //clear text
    const x = deleteText.split(".");
    let x1 = x[0];
    const x2 = x[1];
    const x3 = x.length > 1 ? "." + x2.slice(0, fix || 8) : "";
    if (!x1) x1 = "0";
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1,$2");
    }
    let result = (x1 + x3).replace(/^0+(?!\.|$)/, "").replace(/^\./, "");
    return `${number < 0 ? "-" : ""}${result}`;
  } catch (e) {
    return "0.00";
  }
}

export function fPercent(number: any) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number: any) {
  return numeral(number).format();
}

export function fShortenNumber(number: any) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number: any) {
  return numeral(number).format("0.0 b");
}

export function fRoundDown(number: any, decimals: any) {
  decimals = decimals || 0;
  return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Date time ----------------------------------------------------------------------

export function fDate(date: any) {
  return format(new Date(date), "yyyy-MM-dd");
}

export function fDateTime(date: any, formatStr: any) {
  return format(new Date(date), formatStr || "yyyy-MM-dd HH:mm:ss");
}

export function fDateTimeSuffix(date: any) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date: any) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

// String ----------------------------------------------------------------------

export function fDisplayName(displayName = "") {
  const length = displayName.length;
  if (length > 15) {
    return `${displayName.substring(0, 5)}...${displayName.substring(
      length - 5,
      length
    )}`;
  }
  return displayName;
}

// Orderbook  ----------------------------------------------------------------------
export function getRandomArbitrary(min: any, max: any) {
  return new Decimal(Math.random() * (max - min) + min)
    .toDecimalPlaces(5, Decimal.ROUND_DOWN)
    .toNumber();
}

export const formatOrderbook = (
  inputArray: any = [],
  decimal: any = 2,
  sortMode?: any
) => {
  var total = 0;
  var max = 0;
  const resultMap: any = {};
  const temp =
    sortMode === "asc"
      ? inputArray.slice().sort((a: any, b: any) => a[0] - b[0])
      : inputArray.slice().sort((a: any, b: any) => b[0] - a[0]);
  temp.forEach(([key, value1]: any) => {
    const price = new Decimal(key).toDP(decimal, Decimal.ROUND_UP).toNumber();
    const amount = new Decimal(value1)
      .toDP(decimal, Decimal.ROUND_UP)
      .toNumber();
    const oldTotal = new Decimal(key * value1)
      .toDP(decimal, Decimal.ROUND_UP)
      .toNumber();
    const newTotal = new Decimal(price * amount)
      .toDP(decimal, Decimal.ROUND_UP)
      .toNumber();
    total += oldTotal;
    if (resultMap.hasOwnProperty(price)) {
      resultMap[price][0] += amount;
      resultMap[price][1] += oldTotal;
    } else {
      resultMap[price] = [amount, oldTotal, newTotal, total, max];
    }
  });
  const formattedOrderbook = Object.entries(resultMap).map(
    ([key, [value1, value2, value3, value4, value5]]: any) => {
      max = Decimal.max(max, value2).toNumber();
      return [
        new Decimal(key).toFixed(decimal),
        new Decimal(value1).toFixed(decimal),
        new Decimal(value2).toFixed(decimal),
        new Decimal(value3).toFixed(decimal),
        new Decimal(value4).toFixed(decimal),
        new Decimal(value5).toFixed(decimal),
      ];
    }
  );

  const output = formattedOrderbook
    .slice()
    .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));

  return {
    formattedOrderbook: output,
    total,
    max,
    length: output.length,
  };
};

export const fAddress = (string: any, length = 4) => {
  if (string) {
    if (string.length > length * 2) {
      return `${string.slice(0, length)}...${string.slice(
        string.length - length
      )}`;
    }
    return string;
  }
  return null;
};
