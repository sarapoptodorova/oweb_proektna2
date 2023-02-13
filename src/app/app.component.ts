import { isNgTemplate } from '@angular/compiler';
import { Component, IterableDiffers } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tocenZbor = 'MANIC';
  boxes = [
    [
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
    ],
    [
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
    ],
    [
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
    ],
    [
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
    ],
    [
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
    ],
    [
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
      { class: 'childTile', key: '' },
    ],
  ];
  keyboard = [
    { key: 'Q', class: '' },
    { key: 'W', class: '' },
    { key: 'E', class: '' },
    { key: 'R', class: '' },
    { key: 'T', class: '' },
    { key: 'Y', class: '' },
    { key: 'U', class: '' },
    { key: 'I', class: '' },
    { key: 'O', class: '' },
    { key: 'P', class: '' },
    { key: 'A', class: '' },
    { key: 'S', class: '' },
    { key: 'D', class: '' },
    { key: 'F', class: '' },
    { key: 'G', class: '' },
    { key: 'H', class: '' },
    { key: 'J', class: '' },
    { key: 'K', class: '' },
    { key: 'L', class: '' },
    { key: 'Z', class: '' },
    { key: 'X', class: '' },
    { key: 'C', class: '' },
    { key: 'V', class: '' },
    { key: 'B', class: '' },
    { key: 'N', class: '' },
    { key: 'M', class: '' },
    { key: 'BACKSPACE', class: '' },
    { key: 'ENTER', class: '' },
  ];
  rowIndex = 0;
  currentRowIndex = 0;

  handleChange(key: any) {
    if (key === 'ENTER') {
      this.enter();
      return;
    }
    if (key === 'BACKSPACE') {
      this.backspace();
      return;
    }
    if (this.currentRowIndex < 5 && this.rowIndex < 6) {
      this.boxes[this.rowIndex][this.currentRowIndex] = {
        class: 'childTile',
        key: key,
      }; //fakticki u koja kocka sme, tamu ja stavame bukvata so sme ja kliknale
      this.currentRowIndex++;
    }
  }

  backspace() {
    if (this.currentRowIndex > 0) {
      this.boxes[this.rowIndex][this.currentRowIndex - 1] = {
        class: 'childTile',
        key: '',
      };
      this.currentRowIndex--;
    } else {
      this.boxes[this.rowIndex][this.currentRowIndex - 1] = {
        class: 'childTile',
        key: '',
      };
      this.currentRowIndex = 0;
    }
  }

  enter() {
    let pom = this.tocenZbor;
    if (this.currentRowIndex === 5 && this.rowIndex < 6) {
      let guess = this.boxes[this.rowIndex].map((item) => {
          return item.key; //sekoja bukva po bukva so sme ja vnele od zborot
        }).join(''); //join gi stava site bukvi u eden string

      console.log(guess);

      if (guess === this.tocenZbor) {
        this.boxes[this.rowIndex].forEach((item) => {
          item.class = 'green';
        });
        alert('You guessed the word!');
        for (let i = 0; i < this.rowIndex + 1; i++) {
          for (let j = 0; j < this.currentRowIndex; j++) {
            this.boxes[i][j] = { class: 'childTile', key: '' };
          }
        }
        this.currentRowIndex = 0;
        this.rowIndex = 0;  
        return; 
      }
    
      this.boxes[this.rowIndex].forEach((item, index) => {
        if (item.key === this.tocenZbor[index]) {
          item.class = 'green';
          pom = pom.replace(item.key, ''); //tie so gi nasol na tocnoto mesto da gi trgne od zborot da ne gi proveruva pak
        } else if (pom.includes(item.key)) {
          item.class = 'yellow';
        } else {
          item.class = 'grey';
        }
      });

      if (this.rowIndex < 6) {
        this.rowIndex++;

        if (this.rowIndex == 6) {
          alert('Sorry, the word was MANIC');
          for (let p = 0; p < this.rowIndex; p++) {
            for (let q = 0; q < this.currentRowIndex; q++) {
              this.boxes[p][q] = { class: 'childTile', key: '' };
            }
          }
          this.currentRowIndex = 0;
          this.rowIndex = 0;
          return; 
        }

        this.currentRowIndex = 0;
      }
    }
  }
}
