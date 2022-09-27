import { Component } from '@angular/core';
import * as Bucket from '@spica-devkit/bucket';
import * as Storage from '@spica-devkit/storage';
import { IData } from 'src/Interface/Interface';

Bucket.initialize({
  publicUrl: '< url >',
  identity:
    '< identity key >',
});

Bucket.initialize({
  publicUrl: '< url >',
  apikey:
    '< api key >',
});

Storage.initialize({
  publicUrl: '< url >',
  identity:
    '< identity key >',
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spica';
  buckets: IData[] = [];
  storageData = this.getStorage();

  async ngOnInit() {
    this.bucketPromise()
      .then((data) => {
        localStorage.setItem('buckets', JSON.stringify(data));
        const data_obj = localStorage.getItem('buckets');
        this.buckets = JSON.parse(data_obj || '');
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });

    this.getStorage()
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }

  bucketPromise() {
    return Bucket.data.getAll('< bucket id >');
  }

  getStorage() {
    return Storage.getAll();
  }
}
