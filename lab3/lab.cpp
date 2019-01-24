#include <cstdlib>
#include <iostream>
#include <ctime>
#include <cmath>
#include <cstdio>
#include <gmp.h>
int main(int argc, char *argv[]){
    long long p = 5; //простое
    long long q = 5; //простое
    long long X = 112; //факторизуемое
    long long g = 7;

    std::srand(unsigned(std::time(0)));
    int random_variable = std::rand();
    
    std::cout << "Случайное значение на отрезке [0 " << RAND_MAX << "]: "
              << random_variable << '\n';
    float rounded = round((float)random_variable/RAND_MAX);
    std::cout << "round(): " << rounded << '\n';

    std::cout << "p: " << p << std::endl;
    std::cout << "q: " << q << std::endl;
    std::cout << "X: " << X << std::endl;
    std::cout << "g: " << g << std::endl;

    /**
     * V = verifier, P = prover;
     * 1. step by P. 
     * get 'r' from Multiplicative group of integers modulo q
     * getting h= g^r(mod p);
     */
    long long r = round(((float)random_variable/RAND_MAX)*(q-1));
    std::cout << "r: " << r << std::endl;
    long long h = (long long)pow(g, r) % p;
    std::cout << "h: " << h << std::endl;
    
    return 0;
}