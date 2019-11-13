package com.app.machine;

import com.app.maker.CoffeeMaker;
import com.app.maker.Maker;
import com.app.maker.TeaMaker;

public class VendingMachine {
	public static void main(String[] args) {
		Maker maker=new TeaMaker();
		System.out.println(maker.make());
		maker=new CoffeeMaker();
		System.out.println(maker.make());
		
	}
}
