import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "reactstrap";
import { addProdutoNome } from "../redux/slices/carrinho.slice";
import { RootState } from "../redux/store";

export default function ProdutosList() {
  const dispatch = useDispatch();

  const { produtos } = useSelector((state: RootState) => state.apiProduto);
  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);

  function inserirCarrinho(name: string) {
    dispatch(addProdutoNome(name));
  }
  // Novo codigo!!!
  if(isAdmin){
    return (
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Estoque</th>
            {isAdmin ? null : <th scope="col">Inserir Carrinho</th>}
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => {
            return (
              <tr key={produto.id}>
                <th scope="row">{index + 1}</th>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco}</td>
                <td>{produto.estoque}</td>
                <td>
                  {isAdmin ? null : (
                    <Button
                      onClick={() => {
                        inserirCarrinho(produto.nome);
                      }}
                    >
                      Inserir no Carrinho
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  else{
    return (
      <div className="card-group">
        {produtos.map((produto, index) => {
            return (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text">
                    Preco: {produto.preco}
                  </p>
                  <a className="btn btn-primary"  onClick={() => {
                        inserirCarrinho(produto.nome);
                      }}> Inserir no Carrinho</a>
                  <p className="card-text">
                    <small className="text-muted">Estoque : {produto.estoque}</small>
                  </p>
                </div>
              </div>
            )
          })}
      </div>   
    )
  }
}
