import style from './Spinner.module.css'

export default function Spinner() {
  return (
    <div className={style.spinner}>
        <div className={style.rect1}></div>
        <div className={style.rect2}></div>
        <div className={style.rect3}></div>
        <div className={style.rect4}></div>
        <div className={style.rect5}></div>
    </div>
  )
}
