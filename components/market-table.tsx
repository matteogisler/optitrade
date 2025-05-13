'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Coin } from '@/lib/types';
import { formatPercentage, formatPrice, formatNumber } from '@/lib/api';

interface MarketTableProps {
  coins?: Coin[];
  isLoading: boolean;
}

export function MarketTable({ coins, isLoading }: MarketTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter coins based on search term
  const filteredCoins = coins?.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination logic
  const totalPages = filteredCoins ? Math.ceil(filteredCoins.length / itemsPerPage) : 0;
  const paginatedCoins = filteredCoins?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle navigation to dashboard with selected coin
  const handleCoinSelect = (coinId: string) => {
    router.push(`/?coin=${coinId}`);
  };
  
  // Generate page numbers for pagination
  const pageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate middle pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1); // Use -1 to indicate ellipsis
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // Use -2 to indicate ellipsis
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name or symbol..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">7d %</TableHead>
              <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
              <TableHead className="text-right hidden md:table-cell">Volume (24h)</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !paginatedCoins ? (
              Array(10).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-12 mt-1" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  <TableCell className="text-right hidden md:table-cell"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                  <TableCell className="text-right hidden md:table-cell"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : paginatedCoins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  No coins found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            ) : (
              paginatedCoins.map((coin) => {
                const { value: change24h, isPositive: isPositive24h } = formatPercentage(coin.price_change_percentage_24h);
                const { value: change7d, isPositive: isPositive7d } = formatPercentage(coin.price_change_percentage_7d_in_currency);
                
                return (
                  <TableRow 
                    key={coin.id}
                    className="cursor-pointer hover:bg-secondary/50"
                    onClick={() => handleCoinSelect(coin.id)}
                  >
                    <TableCell className="font-medium">{coin.market_cap_rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="relative w-8 h-8">
                          <Image 
                            src={coin.image} 
                            alt={coin.name}
                            fill
                            sizes="32px"
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{coin.name}</div>
                          <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPrice(coin.current_price)}
                    </TableCell>
                    <TableCell className={`text-right ${isPositive24h ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {change24h}
                    </TableCell>
                    <TableCell className={`text-right ${isPositive7d ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {change7d}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      {formatNumber(coin.market_cap)}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      {formatNumber(coin.total_volume)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCoinSelect(coin.id);
                        }}
                      >
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {pageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page < 0 ? (
                  <span className="px-4 py-2">...</span>
                ) : (
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}