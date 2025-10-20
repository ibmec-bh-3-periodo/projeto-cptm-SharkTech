interface HistoricoItem {
  data: string;          
  descricao: string;     
  valor: number;         
}

interface Favorito {
  idEstacao: number;     
  nome: string;          
  linha: string;         
}

interface Usuario {
  id: number;            
  username: string;      
  email: string;         
  password: string;      
  saldo: number;       
  historico: HistoricoItem[];  
  favoritos: Favorito[];       
}
