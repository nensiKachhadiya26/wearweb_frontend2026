import React from 'react';

const Footer = () => {
  return (
  
    
    <footer className="bg-[#FFF0F5] text-[#282c3f] py-12 font-sans border-t border-pink-100 mt-auto">
      <div className="max-w-[1200px] mx-auto px-5">
        
        {/* Popular Searches Section */}
        <div className="border-b border-pink-200 pb-8 mb-8">

          <h4 className="text-[12px] font-bold uppercase mb-4 tracking-widest text-[#ff3f6c]">Popular Searches</h4>
          <p className="text-gray-500 text-[13px] leading-relaxed">
            Foundation | Kurties For Girls | T-Shirts | Chappal For Women | Caps | Babydolls | 
            Jacket For Men | Skirt | Ladies Watches | Mens Watches | Perfume | Face Wash | 
            Moisturizer | Sun Screen | Wallets | Tops | Toys For Kids | Jeans For Men | Jeans For Kids | 
            Jeans For Women | Hoodie | Shirt | Belt | Sun Glasses
          </p>
        </div>

        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[14px] text-gray-600">
          
          {/* Address */}
          <div>
            <h4 className="text-[12px] font-bold uppercase mb-4 text-gray-800 tracking-widest">Registered Office Address</h4>
            <div className="space-y-1 leading-6">
              <p className="font-medium text-gray-700">Wear Web Headquarters,</p>
              <p>Beside Shrusi Mall, Satellite Road,</p>
              <p>Ahmedabad, Gujarat – 380015, India</p>
            </div>
          </div>

          {/* Contact & Legal */}
          <div className="md:text-right">
            <p className="mb-2">Email: <span className="text-[#ff3f6c] hover:underline cursor-pointer">wearweb@yopmail.com</span></p>
            <p>
              Telephone: <span className="text-[#ff3f6c] font-bold hover:underline cursor-pointer">090-06012950</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-pink-200 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[11px] font-medium tracking-wider">
          <p>© 2026 www.wearweb.com. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-[#ff3f6c] font-bold text-sm">WEAR WEB</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;