const selectedSeat = document.getElementById('selected-seat');
const seatCount = document.getElementById('seat-count');
const availableSeat = document.getElementById('available-seat');
let totalPrice = 0;
const totalPriceEl = document.getElementById('total-price');
const couponField = document.getElementById('coupon-field');
const couponButton = document.getElementById('coupon-button');
const noSeat = document.getElementById('no-seat');
const grandTotal = document.getElementById('grand-total');
const phoneNo = document.getElementById('phone-no');
const nextButton = document.getElementById('next-button');
const passengerName = document.getElementById('passenger-name');
const passengerEmail = document.getElementById('passenger-email');


let selectedSeatList = [];

function handleSelectSeat(event){
    const value = event.innerText;
    if (selectedSeatList.includes(value)){
        return alert('Seat already booked')
    }else if(selectedSeatList.length < 4){
        console.log(event.innerText);
        event.classList.add('bg-green-500');
        event.classList.add('text-white');

        selectedSeatList.push(event.innerText);
        seatCount.innerText = selectedSeatList.length;


        //decrease available seat
        const availableSeatValue = parseInt(availableSeat.innerText);
        const newAvailableSeatValue = availableSeatValue-1;
        availableSeat.innerText = newAvailableSeatValue;

        noSeat.classList.add('hidden');
        selectedSeat.innerHTML +=`<li class ="flex justify-between">
        <span>${event.innerText}</span>
        <span>Economy</span>
        <span>$550</span>
        </li>`

        // update price
        totalPrice +=550;
        totalPriceEl.innerText = totalPrice.toFixed(2);
        grandTotal.innerText = totalPriceEl.innerText;


        // enable coupon
        if(selectedSeatList.length > 3){
            couponField.removeAttribute('disabled');
            couponButton.removeAttribute('disabled');
        }

        if(selectedSeatList.length > 0){
            phoneNo.removeAttribute('disabled');
            passengerName.removeAttribute('disabled');
            passengerEmail.removeAttribute('disabled');
        }
    }else{
    return alert('Maximum seat booked')
}

}

// coupon activation

const couponPrice = document.getElementById('coupon-price');
const showDiscount = document.getElementById('show-discount');
const discountPrice = document.getElementById('discount-price');

document.getElementById('coupon-button').addEventListener('click', function(){
    const couponInputValue = couponField.value;
    let discount = 0;
    console.log(couponInputValue);

    if(couponInputValue !== 'NEW50' && couponInputValue !== 'Coupon 20'){
        alert('Coupon code is not valid');
        return;
    }
    if(couponInputValue === 'NEW50'){
        discount = totalPrice * 0.15;
        showDiscount.classList.remove('hidden');
        discountPrice.innerText = discount;
        couponButton.classList.add('hidden');
        couponField.classList.add('hidden');

    }else if(couponInputValue === 'Coupon-20'){
        discount = totalPrice * 0.20;
        showDiscount.classList.remove('hidden');
        discountPrice.innerText = discount;
        couponButton.classList.add('hidden');
        couponField.classList.add('hidden');
    }

    const grandTotalValue = totalPrice - discount;
    grandTotal.innerText = grandTotalValue.toFixed(2);
})

// modal popup

phoneNo.addEventListener('input', function(e){
    const inputValue = e.target.value;
    if(inputValue.length >= 11){
        nextButton.removeAttribute('disabled');
    }
})


document.getElementById('continue-button').addEventListener('click', function(){
    window.location.reload();
})