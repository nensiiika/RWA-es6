import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';
import { DrawService } from './draw.service';
import {} from './reservation.service';

const randserv = new RandomService();



//rating skole
Promise.all([
        KursService.get(), NastavnikService.get()
    ])
    .then(([kursevi, nastavnici]) => {

        let k = kursevi.reduce((acc, curr) => acc + curr.rating, 0);
        let n = nastavnici.reduce((acc, curr) => acc + curr.rating, 0);

        let r = ((k + n) / (kursevi.length + nastavnici.length)).toFixed(2);

        DrawService.ShowSchoolRating(r);
    });


//rating svih nastavnika ukupno
const teachs = NastavnikService.get()
    .then(teachs => {
        const r = Math.round(teachs.reduce((acc, curr) => acc + curr.rating, 0), 2);
        const r1 = r / teachs.length;
        DrawService.ShowTeacherRating(r1);
    });



const teachs2 = NastavnikService.get()
    .then(teachs2 => teachs2.forEach(teach => DrawService.showTeacher(teach)));



//nastavnik dana
Promise.all([
        randserv.getRandomNumb(), NastavnikService.get()
    ])
    .then(([num, arr_nast]) => {
        DrawService.showTeacherDay(arr_nast[num % arr_nast.length]);
    });




const cs1 = KursService.get()
    .then(cs1 => cs1.filter(kurs => kurs.science))
    .then(cs1 => cs1.forEach(kurs => DrawService.ShowScience(kurs)));

const cs2 = KursService.get()
    .then(cs2 => cs2.filter(kurs => !kurs.science))
    .then(cs2 => cs2.forEach(kurs => DrawService.ShowLang(kurs)));




//rating za kurseve

const nauke = KursService.get()
    .then(nauke => nauke.filter(item => item.science))
    .then(nauke => {
        const ratsc = nauke.reduce((acc, curr) => acc + curr.rating, 0);
        const ratsc1 = (ratsc / nauke.length).toFixed(2);
        DrawService.ShowScienceRating(ratsc1);
    });


const langs = KursService.get()
    .then(langs => langs.filter(item => !item.science))
    .then(langs => {
        const ratl = langs.reduce((acc, curr) => acc + curr.rating, 0);
        const ratlg = (ratl / langs.length).toFixed(2);
        DrawService.ShowLangRating(ratlg);
    });