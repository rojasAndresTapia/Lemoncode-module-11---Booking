const reservas = [
  {
    tipoHabitacion: 'standard',
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: 'standard',
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: 'suite',
    pax: 2,
    noches: 1,
  },
];

class hotelBook {
  constructor(_reserva, _IVA, _subtotal) {
    this._reserva = [];
    this._IVA = 21;
    this._subtotal = 0;
  }

  calculatePaxPrice(pax) {
    if (pax === 1) {
      return 0;
    } else if (pax > 1) {
      return (pax - 1) * 40;
    }
  }

  calculateFactorRoomType(tipoHabitacion) {
    switch (tipoHabitacion) {
      case 'standard':
        return 100;
      case 'suite':
        return 150;
      default:
        return 100;
    }
  }

  calculateSubtotal() {
    this._subtotal = this._reserva.reduce(
      (acumulado, { tipoHabitacion, pax, noches }) =>
        acumulado +
        (this.calculateFactorRoomType(tipoHabitacion) * pax * noches +
          this.calculatePaxPrice(pax)),
      0
    );
  }

  get total() {
    return this._total;
  }

  calculateTotal() {
    this._total = this.subtotal + (this.subtotal * this._IVA) / 100;
  }

  get subtotal() {
    return this._subtotal;
  }

  set reserva(reserva) {
    this._reserva = reserva;
    this.calculateSubtotal();
    this.calculateTotal();
  }
}

console.log('*********** Reserva cliente particular ************');
const booking = new hotelBook();
booking.reserva = reservas;
console.log('subtotal', booking.subtotal);
console.log('total', booking.total);

console.log('*********** Reserva tour operador ************');

class hotelBookTourOperator extends hotelBook {
  constructor(discount) {
    super();
    this._discount = 15;
  }
  calculateFactorRoomType(tipoHabitacion) {
    switch (tipoHabitacion) {
      default:
        return 100;
    }
  }

  calculateTotal() {
    this._total = this.subtotal - (this.subtotal * this._discount) /100 + (this.subtotal * this._IVA) / 100;
  }


}

const bookingTourOperador = new hotelBookTourOperator();
bookingTourOperador.reserva = reservas;

console.log('subtotal', bookingTourOperador.subtotal);
console.log('total', bookingTourOperador.total);
