export function numberToWords(num) {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const scales = ["", "Thousand", "Lakh", "Crore"];

  function convert_hundred(number) {
    let result = "";
    if (number > 99) {
      result += units[Math.floor(number / 100)] + " Hundred ";
      number = number % 100;
    }
    if (number > 0) {
      if (number < 20) {
        result += units[number];
      } else {
        result += tens[Math.floor(number / 10)];
        if (number % 10 > 0) {
          result += " " + units[number % 10];
        }
      }
    }
    return result.trim();
  }

  function convert_to_words(number) {
    if (number === 0) return "Zero";

    let parts = [];
    let scaleIndex = 0;

    while (number > 0) {
      let part = number % 1000;
      if (part > 0) {
        parts.push(
          convert_hundred(part) +
            (scales[scaleIndex] ? " " + scales[scaleIndex] : "")
        );
      }
      number = Math.floor(number / 1000);
      scaleIndex++;
    }

    return parts.reverse().join(", ").trim();
  }

  function convertRupeesToWords(amount) {
    let [rupees, paise] = amount.toString().split(".");

    let words = convert_to_words(parseInt(rupees)) + " Rupees";
    if (paise && parseInt(paise) > 0) {
      words += " and " + convert_to_words(parseInt(paise)) + " Paise";
    }

    return words + " Only";
  }

  return convertRupeesToWords(num);
}
