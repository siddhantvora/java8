package com.app;

public class Test {
	public static void main(String[] args) {
		int [] [] arr= {{1,2,3},{1,1,1},{2,1,3},{1,4,5}};
		int rowlength=arr.length;
		int columnlength=arr[0].length;
			while(rowlength-- > 1) {
				arr=rowReducer(arr);
			}
			while(columnlength-- > 1) {
				arr=columnReducer(arr);
			}
		for(int i=0;i<arr.length;i++) {
			for(int j=0;j < arr[i].length;j++) {
				System.out.print(arr[i][j]+" ");
			}
			System.out.println();
		}
	}
	public static int[][] rowReducer(int arr[][]){
		int arr2[][]=new int[arr.length-1][arr[0].length];
		
			for(int j=0;j < arr[0].length;j++) {
				arr2[0][j]=arr[0][j]+arr[1][j];
			}
			

			for(int i=1;i < arr.length-1;i++) {
				for(int j=0;j < arr[i].length;j++) {
				arr2[i][j]=arr[i+1][j];
				}
			}
				
		return arr2;
	}
	public static int[][] columnReducer(int arr[][]){
		int arr2[][]=new int[arr.length][arr[0].length-1];
		
			for(int j=0;j < arr.length;j++) {
				arr2[j][0]=arr[j][1]-arr[j][0];
			}
			

			for(int i=0;i<arr.length;i++) {
				for(int j=1;j<arr[i].length-1;j++ ) {
					arr2[i][j]=arr[i][j+1];
				}
			}
				
		return arr2;
	}
}
