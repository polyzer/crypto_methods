//http://www.cryptoprotocols.kz/index.php?view=examples&id=20
#include <cstdlib>
#include <iostream>
#include <ctime>
#include <cmath>
#include <cstdio>
#include <gmp.h>
int main(int argc, char *argv[]){
    long long p = 31; //простое
    long long q = 5; //простое

    long long alpha = 3;
    long long S = 3;
    long long H = 5;
    long long n = 3;
    long long U = 2;
    long long gamma = 2;
    long long gamma1 = 2;
    long long gamma2 = 2;

    long long 
    long long k = (U - Z) % gamma;
    long long g = (U / (U - Z)) % gamma;
    long long Z = (H * pow(alpha, U)) % n;

    std::srand(unsigned(std::time(0)));
    int random_variable = std::rand();
    

    std::cout << "p: " << p << std::endl;
    std::cout << "q: " << q << std::endl;
    std::cout << "g: " << g << std::endl;

    /**
     * V = verifier, P = prover;
     * 1. step by P. 
     * get 'r' from Multiplicative group of integers modulo q
     * getting h= g^r(mod p);
     */
    std::cout << "First step by Prover: " << std::endl;
    long long r = round(((float)random_variable/RAND_MAX)*(q-1));


    return 0;
}