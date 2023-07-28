import { createSlice } from "@reduxjs/toolkit";


export const carrinhoSlice = createSlice({
  name: "carrinhoSlice",
  initialState: {
    produtos: [] as string[],
    qtd:[] as number[],
    total: 0
  },

  reducers: {
    // Novo codigo!!!
    addProdutoNome(state, action) {
      if(state.produtos.includes(action.payload)){
        state.produtos.forEach( (prod,index) =>{
          if(prod=== action.payload) state.qtd[index] +=1;
        })
        return state
      }
      state.produtos.push(action.payload);
      state.qtd.push(1);
      state.total +=1;
      return state;
    },
    removeProdutoName(state,action){
      state.produtos.forEach( (prod,index) =>{
        if(prod=== action.payload) {state.produtos.splice(index,1)
          state.qtd.splice(index,1);
        };
      })
      state.total -=1;
      return state;
    },
    decrementQtd(state,action){
      state.produtos.forEach( (prod,index) =>{
        if(prod=== action.payload) {
          state.qtd[index] -=1;
        };
      })
      
      return state;
    },
    incrementQtd(state,action){
      state.produtos.forEach( (prod,index) =>{
        if(prod=== action.payload) {
          state.qtd[index] +=1;
        };
      })
      return state;
    }
  },
});

export const { addProdutoNome,removeProdutoName,incrementQtd,decrementQtd } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
