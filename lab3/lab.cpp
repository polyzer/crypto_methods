#include <cstdlib>
#include <iostream>
#include <ctime>
#include <cmath>
#include <cstdio>
#include <gmp.h>
int main(int argc, char *argv[]){
    long long p = 31; //простое
    long long q = 5; //простое
    long long X = 112; //факторизуемое
    long long g = 3;
    long long x = 2;
    int m = 1;

    std::srand(unsigned(std::time(0)));
    int random_variable = std::rand();
    

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
    std::cout << "First step by Prover: " << std::endl;
    long long r = round(((float)random_variable/RAND_MAX)*(q-1));
    std::cout << "r: " << r << std::endl;
    long long h = (long long)pow(g, r) % p;
    std::cout << "h: " << h << std::endl;
    /**
     * 1. step by V.
     * getting b = 0 or 1.
     */
    std::cout << "First step by Verifier: " << std::endl;
    long long b = round((float)random_variable/RAND_MAX);
    std::cout << "b: " << b << '\n';

    /**
     * 2. step by P.
     * P must get 'k': k = (r + xb) % q
     */
    std::cout << "Second step by Prover: " << std::endl;

    long long k = (r + x*b) % q;
    std::cout << "k: " << k << std::endl;
    long long g_k = (long long) pow(g, k) % p;
    long long X_b_h = ((long long ) pow(X, b) * h) % p;
    while (m > 0){
        if (g_k == X_b_h) {
            std::cout << "is g_k == X_b_h: true" << std::endl;
        } else {
            std::cout << "is g_k != X_b_h: false" << std::endl;
        }
        m--;
    }

    return 0;
}