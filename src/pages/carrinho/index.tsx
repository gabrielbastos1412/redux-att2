import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import NavBarCustom from "../../components/navbar";
import { RootState } from "../../redux/store";
import "./index.css";
import { decrementQtd, incrementQtd, removeProdutoName } from "../../redux/slices/carrinho.slice";

export default function Carrinho() {
  const dispatch = useDispatch();

  const produto = useSelector((state: RootState) => state.carrinho);
  const { produtos } = useSelector((state: RootState) => state.apiProduto);

  function removerCarrinho(name: string) {
    dispatch(removeProdutoName(name));
  }
  function decrement(name: string) {
    dispatch(decrementQtd(name));
  }
  function increment(name: string) {
    dispatch(incrementQtd(name));
  }


  // Novo codigo!!!
  return (
    <div className="containerCart">
      <div style={{ width: "100%" }}>
        <NavBarCustom />
      </div>
      <h2>CARRINHO</h2>
      
      <div className="list-group" style={{ overflow: "scroll", height: "1500px", width:'1000px'}}>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">produto</th>
              <th scope="col">preco</th>
              <th scope="col">quantidade</th>
              <th scope="col">Remover</th>
            </tr>
          </thead>
          <tbody>
          {produto.produtos.map((prod,index) => {
            return (
              <tr>
                <th scope="row">{index+1}</th>
                <td>{prod}</td>
                <td>{produtos.map((produ) =>{
                  if(produ.nome===prod) return produ.preco;
                })}</td>
                <td><button onClick={() => {decrement(prod); }}>-</button>{produto.qtd[index]}<button onClick={() => {increment(prod);}}>+</button></td>
                <td>
                  <button onClick={() => {
                        removerCarrinho(prod);
                      }}>Remover</button>
                </td>
              </tr>             
            ) ;
          })}
          </tbody>
        </table>
        </div>
    </div>
  );
}
