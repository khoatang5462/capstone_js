export class SanPham {
    constructor(_name, _price, _screen, _backCamera, _type, _frontCamera, _img, _desc) {
        this.name = _name;
        this.price = _price;
        this.screen = _screen;
        this.backCamera = _backCamera;
        this.type = _type;
        this.frontCamera= _frontCamera;
        this.img = _img;
        this.desc = _desc;
    }
    
   mappingType(){
    if(this.type === "iphone") return "Iphone"
    if(this.type === "samsung") return "Samsung"
    return "vui lòng chọn loại"
   }
  
}
