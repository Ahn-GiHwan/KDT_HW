// 상품 데이터
const data = [
  { name: "초콜렛", price: 2000 },
  { name: "아이스크림", price: 1000 },
  { name: "컵라면", price: 1600 },
  { name: "볼펜", price: 2500 },
  { name: "아메리카노", price: 4000 },
  { name: "과자", price: 3000 },
  { name: "탄산수", price: 1200 },
  { name: "떡볶이", price: 3500 },
  { name: "노트", price: 1500 },
  { name: "껌", price: 500 },
];

// 사용자 입력 받기
const line = prompt("최대 금액을 입력해주세요.");
const amount = +line;

// 주어진 금액으로 살 수 있는 가장 비싼 상품을 구함
const item = getItemByAmount(data, amount);

const msg = item
  ? `${amount}원으로 살 수 있는 가장 비싼 상품은 [${item.name}]이고, 가격은 ${item.price}원입니다.`
  : "살 수 있는 상품이 없습니다.";

// 결과 출력
alert(msg);

// 아래에 getItemByAmount 함수를 작성하세요.
function getItemByAmount(data, amount) {
  if (isVaildation(amount)) return null;
  else return logic(data, amount);
}

// ================================
// ===== Validation functions =====
// ================================

// amount값(사용자 입력 값)을 검증하는 함수
// 문제가 있으면 true, 없으면 false를 반환한다.
function isVaildation(amount) {
  if (typeValid(amount)) {
    alert(`숫자가 아닙니다. 0 이상의 수를 입력해 주세요.`);
    return true;
  } else if (negValid(amount)) {
    alert(`음수입니다. 0 이상의 수를 입력해 주세요.`);
    return true;
  } else false;
}

// 사용자의 입력한 값의 타입이 숫자인지 확인하는 함수
// 숫자이면 false, 숫자가 아니면 true를 반환
function typeValid(amount) {
  return isNaN(amount);
}

// 사용자의 입력한 값이 0 이상의 숫자인지 확인하는 함수
// 0 이상이면 false, 0 보다 작으면 true를 반환
function negValid(amount) {
  return amount < 0 ? true : false;
}

// =============================
// ====== Logic functions ======
// =============================

// 실제 사용할 함수를 불러오는 함수
function logic(data, amount) {
  // use reduce()
  return useReduce(data, amount);

  // use filter()
  // return useFilter(data, amount);

  // use find()
  // return useFind(data, amount);

  // use findIndex()
  // return useFindIndex(data, amount);

  // use forEach()
  // return useForEach(data, amount);

  // use map()
  // return useMap(data, amount);

  // useFor()
  // return useFor(data, amount);

  // useWhile()
  // return useWhile(data, amount);
}

// reduce()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useReduce(data, amount) {
  // ver.1
  const result = data.reduce(
    (acc, cur) => {
      if (acc.price < cur.price && cur.price <= amount) {
        acc.price = cur.price;
        acc.name = cur.name;
      }
      return acc;
    },
    { price: 0 }
  );

  // ver.2
  // const result = data.reduce(
  //   (acc, cur) => {
  //     if (acc.price) {
  //       if (acc.price < cur.price && cur.price <= amount) {
  //         acc.price = cur.price;
  //         acc.name = cur.name;
  //       }
  //     } else {
  //       if (cur.price <= amount && acc.price < cur.price) {
  //         acc.price = cur.price;
  //         acc.name = cur.name;
  //       }
  //     }
  //     return acc;
  //   },
  //   { price: 0 }
  // );

  return result.name ? result : null;
}

// filter()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useFilter(data, amount) {
  const result = data
    .filter((goods) => goods.price <= amount)
    .sort((a, b) => b.price - a.price)[0];

  return result ? result : null;
}

// find()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useFind(data, amount) {
  const newData = [...data];
  newData.sort((a, b) => b.price - a.price);

  const result = newData.find((a) => a.price <= amount);

  return result ? result : null;
}

// findIndex()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useFindIndex(data, amount) {
  const newData = [...data];
  newData.sort((a, b) => b.price - a.price);

  const index = newData.findIndex((a) => a.price <= amount);
  // 해당 상품이 있으면 해당 index번호를 반환, 없으면 -1(false)를 반환

  return index !== -1 ? newData[index] : null;
}

// forEach()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useForEach(data, amount) {
  const result = { name: "", price: 0 };

  // ver.1
  data.forEach((goods) => {
    if (result.price < goods.price && goods.price <= amount) {
      result.name = goods.name;
      result.price = goods.price;
    }
  });

  // ver.2
  // data.forEach((goods) => {
  //   if (result.price) {
  //     if (goods.price <= amount && result.price < goods.price) {
  //       result.name = goods.name;
  //       result.price = goods.price;
  //     }
  //   } else {
  //     if (result.price < goods.price && goods.price <= amount) {
  //       result.name = goods.name;
  //       result.price = goods.price;
  //     }
  //   }
  // });

  return result.price > 0 ? result : null;
}

// map()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useMap(data, amount) {
  const result = data
    .map((goods) => {
      if (goods.price <= amount) return goods;
    })
    .sort((a, b) => b.price - a.price)[0];

  return result ? result : null;
}

// for()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useFor(data, amount) {
  const result = { price: 0 };

  for (let i = 0; i < data.length; i++) {
    let goods = data[i];
    if (goods.price <= amount && goods.price > result.price) {
      result.name = goods.name;
      result.price = goods.price;
    }
  }

  return result.price ? result : null;
}

// while()를 사용한 상품 선별 로직
// 상품이 있으면 상품 객체, 없으면 null을 반환
function useWhile(data, amount) {
  const result = { price: 0 };

  let i = 0;

  while (i < data.length) {
    let goods = data[i];
    if (goods.price <= amount && goods.price > result.price) {
      result.name = goods.name;
      result.price = goods.price;
    }
    i++;
  }

  return result.price ? result : null;
}
