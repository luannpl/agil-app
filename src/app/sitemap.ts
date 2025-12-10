import { MetadataRoute } from 'next';
import { Veiculo } from '@/types/veiculo';

/**
 * Sitemap dinâmico para SEO
 * 
 * Este arquivo gera automaticamente o sitemap.xml do site,
 * incluindo todas as páginas estáticas e dinâmicas (veículos).
 * 
 * O Next.js irá gerar o sitemap em:
 * https://www.agilconsultoriaautomotiva.com.br/sitemap.xml
 * 
 * Decisões de implementação:
 * - Usa fetch direto ao invés do axios para evitar problemas com baseURL relativa
 * - Páginas estáticas têm changeFrequency 'monthly' (mudam raramente)
 * - Página de veículos tem 'daily' (catálogo atualiza frequentemente)
 * - Cada veículo individual tem 'weekly' (podem ser vendidos/atualizados)
 * - Prioridades: Home (1.0) > Veículos (0.9) > Detalhes (0.8) > Outras (0.5)
 * - Em caso de erro na API, retorna apenas páginas estáticas (graceful degradation)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.agilconsultoriaautomotiva.com.br';
  
  // Páginas estáticas do site
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0, // Página inicial é a mais importante
    },
    {
      url: `${baseUrl}/veiculos`,
      lastModified: new Date(),
      changeFrequency: 'daily', // Catálogo atualiza frequentemente
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Determinar a URL da API baseado no ambiente
    // Em produção, usa a URL completa; em desenvolvimento, usa localhost
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
                   (process.env.NODE_ENV === 'production' 
                     ? `${baseUrl}/api` 
                     : 'http://localhost:3000/api');
    
    // Buscar todos os veículos disponíveis usando fetch
    const response = await fetch(`${apiUrl}/veiculos/disponiveis`, {
      next: { revalidate: 3600 } // Revalidar a cada 1 hora
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar veículos: ${response.status}`);
    }
    
    const veiculos: Veiculo[] = await response.json();
    
    // Gerar URLs dinâmicas para cada veículo
    const veiculosPages: MetadataRoute.Sitemap = veiculos.map((veiculo) => ({
      url: `${baseUrl}/veiculos/detalhes/${veiculo.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // Veículos podem ser vendidos/atualizados
      priority: 0.8, // Alta prioridade para páginas de produtos
    }));

    console.log(`✅ Sitemap gerado com sucesso: ${staticPages.length} páginas estáticas + ${veiculosPages.length} veículos`);
    
    // Combinar páginas estáticas com páginas dinâmicas
    return [...staticPages, ...veiculosPages];
  } catch (error) {
    console.error('⚠️ Erro ao gerar sitemap dinâmico, usando apenas páginas estáticas:', error);
    // Em caso de erro na API, retornar apenas as páginas estáticas
    // Isso garante que o sitemap sempre funcione, mesmo se a API estiver offline
    return staticPages;
  }
}

